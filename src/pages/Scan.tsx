import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Play, Square, Lightbulb, User, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';
import { getUserScans, saveScan, ScanData } from '@/lib/scan';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Scan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [scans, setScans] = useState<ScanData[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (user) {
      loadScans();
    }
  }, [user]);

  const loadScans = async () => {
    if (user) {
      try {
        const userScans = await getUserScans(user.uid);
        setScans(userScans);
      } catch (error) {
        console.error('Error loading scans:', error);
      }
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      showToast({
        type: 'error',
        title: 'Camera Access Denied',
        message: 'Please allow camera access to use body scan feature.'
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startScan = async () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to use the body scan feature.'
      });
      return;
    }

    if (!stream) {
      await startCamera();
      return;
    }

    setIsScanning(true);
    setCountdown(30);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          completeScan();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeScan = async () => {
    setIsScanning(false);
    
    if (user) {
      try {
        const scanData = {
          scanId: `scan_${Date.now()}`,
          height: null,
          weight: null,
          imageURL: null,
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          tryOnCount: 0
        };

        await saveScan(user.uid, scanData);
        await loadScans();
        
        showToast({
          type: 'success',
          title: 'Scan Complete!',
          message: 'Your body scan has been completed successfully.'
        });
      } catch (error) {
        console.error('Error saving scan:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to save scan. Please try again.'
        });
      }
    }

    stopCamera();
  };

  const cancelScan = () => {
    setIsScanning(false);
    setCountdown(0);
    stopCamera();
    showToast({
      type: 'info',
      title: 'Scan Cancelled',
      message: 'Body scan has been cancelled.'
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Body Scan"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-[rgb(236,223,204)] mb-2">AI Body Scan</h1>
          <p className="text-xl text-[rgb(105,117,101)]">Capture your body measurements with AI precision</p>
          <p className="text-[rgb(105,117,101)] mt-2">
            Position yourself 6 feet away from your camera in good lighting. The scan takes about 30 seconds to complete.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Progress */}
          <div className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-6 flex items-center">
              <User className="mr-2" size={20} />
              Your Progress
            </h2>
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                <div className="text-2xl font-bold text-[rgb(236,223,204)]">{scans.length}</div>
                <div className="text-sm text-[rgb(105,117,101)]">Total Scans</div>
              </div>
              
              <div className="text-center p-4 rounded-lg border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                <div className="text-2xl font-bold text-[rgb(236,223,204)]">
                  {scans.length > 0 
                    ? new Date(scans[0].scanTime).toLocaleDateString()
                    : 'Never'
                  }
                </div>
                <div className="text-sm text-[rgb(105,117,101)]">Latest Scan</div>
              </div>
              
              <div className="text-center p-4 rounded-lg border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                <div className="text-2xl font-bold text-[rgb(236,223,204)]">
                  {scans.reduce((total, scan) => total + scan.tryOnCount, 0)}
                </div>
                <div className="text-sm text-[rgb(105,117,101)]">Virtual Try-Ons</div>
              </div>
              
              <Button 
                onClick={() => navigate('/scan-history')}
                variant="outline" 
                className="w-full border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]"
              >
                View Scan History
              </Button>
            </div>
          </div>

          {/* Camera Section */}
          <div className="lg:col-span-2 rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
              {stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-6xl font-bold">
                        {countdown}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Camera size={48} className="mx-auto mb-4" />
                    <p>Camera Preview</p>
                    <p className="text-sm text-gray-400 mt-2">Click "Start Body Scan" to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="border rounded-lg p-6 mb-6" style={{ backgroundColor: 'rgb(60, 61, 55)', borderColor: 'rgb(105,117,101)' }}>
              <h3 className="font-medium text-[rgb(236,223,204)] mb-4 flex items-center">
                <Lightbulb className="mr-2" size={20} />
                Scan Tips for Best Results:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[rgb(105,117,101)]">
                <div className="flex items-start space-x-2">
                  <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[rgb(236,223,204)]">Good Lighting</div>
                    <div>Ensure bright, even lighting without shadows</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <User size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[rgb(236,223,204)]">Fitted Clothing</div>
                    <div>Wear form-fitting clothes for accurate measurements</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[rgb(236,223,204)]">Stay Still</div>
                    <div>Keep steady during the 30-second scan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              {!isScanning ? (
                <Button
                  onClick={startScan}
                  className="flex-1 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)] flex items-center justify-center space-x-2 py-3"
                >
                  <Play size={20} />
                  <span>Start Body Scan</span>
                </Button>
              ) : (
                <Button
                  onClick={cancelScan}
                  variant="destructive"
                  className="flex-1 flex items-center justify-center space-x-2 py-3"
                >
                  <Square size={20} />
                  <span>Cancel Scan</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;