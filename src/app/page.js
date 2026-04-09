"use client"; 

import { motion, AnimatePresence } from 'framer-motion'
import Modal from "@/component/modal";
import { useEffect, useState } from 'react';
import { logon, logoff, getStatus } from '@/lib/auth'

import './page.css';
import Link from 'next/link';

function fmtBytes(b) {
  if (b >= 1073741824) return (b / 1073741824).toFixed(2) + ' GB';
  if (b >= 1048576) return (b / 1048576).toFixed(1) + ' MB';
  if (b >= 1024) return (b / 1024).toFixed(0) + ' KB';
  return b + ' B';
}

export default function Home() {
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setProcessLoading] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const data = await getStatus();

      if (data?.error) {
        setError(data.error);
        setErrorOpen(true);
        setLoading(false);
        return;
      }

      if (data?.clientState === 'AUTHORIZED') {
        setSuccess(true);
        setSessionData(data);
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    checkAuthStatus(); 
  }, []);

  async function handleLogin() {
    if (!user || !pass) {
      setError('Please enter both username and password.')
      setErrorOpen(true)
      return
    }

    setProcessLoading(true)
    setError('')

    const data = await logon(user, pass)
    
    setProcessLoading(false)

    if (data.success) {
      //handlePostLoginRedirect(getRedirectUrl())
      window.location.reload();
    } else {
      setError(data.error || 'Authentication failed. Please check your credentials and try again.')
      setErrorOpen(true)
    }
  }

  return (
    <div className="text-white flex flex-col items-center justify-center gap-5 main-container">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full"
          />
          <p className="mt-4 text-xl">Loading...</p>
        </motion.div>
      )}

      <div className="items-center gap-4 p-6 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.75)]"
        >
          Welcome to {process.env.networkname}
        </motion.p>
        {!isSuccess && (
          <motion.p
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg mt-2 text-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
          >
            Please log in to access the network
          </motion.p>
        )}
        {isSuccess && (
          <motion.p
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg mt-2 text-green-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
          >
            The authentication is successful. You can now access the internet. Enjoy your browsing!
          </motion.p>
        )}

      </div>
      
      <AnimatePresence>
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-4 p-5 rounded-md shadow-md content-container">
              <motion.input
                  placeholder="Username"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className='bg-gray-900 p-2 rounded-md shadow-md w-full max-w-sm'
              />
              <motion.input
                  placeholder="Password"
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className='bg-gray-900 p-2 rounded-md shadow-md w-full max-w-sm'
              />
              <hr className="border-gray-700" />
              <motion.button
                  onClick={handleLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className='bg-gray-900 p-2 rounded-md shadow-md'
              >
                  {loading ? 'Authenticating...' : 'Login'}
              </motion.button>
              <p className="text-xs text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  If you signed that mean you agree to our <Link href="/ToS" className="underline">Terms of Service</Link>.
              </p>
            </div>
          </motion.div>
        )}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-xl p-5 w-full max-w-sm shadow-sm content-container"
          >
            <p className="text-center text-white mb-4">Hello! {sessionData?.userName}</p>
            <div className="space-y-1 text-sm mb-4">
              {[
                { label: 'User IP', value: sessionData?.ipAddress },
                { label: 'Login time', value: sessionData?.startTime ? new Date(sessionData.startTime * 1000).toLocaleString() : '—' },
                ...(sessionData?.acc_session_timeout ? [{ label: 'Session timeout', value: `${sessionData.acc_session_timeout}s` }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <span className="text-white">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Downloaded', bytes: sessionData?.bytes_in, packets: sessionData?.packets_in },
                { label: 'Uploaded', bytes: sessionData?.bytes_out, packets: sessionData?.packets_out },
              ].map(({ label, bytes, packets }) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-white mb-1">{label}</p>
                  <p className="text-lg font-medium">{fmtBytes(bytes)}</p>
                  <p className="text-xs text-gray-400">{packets?.toLocaleString()} packets</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { logoff(); window.location.reload(); }}
              className="w-full bg-red-500 text-white rounded-md py-2 text-sm hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isErrorOpen} onClose={() => setErrorOpen(false)} title="Failed to Authenticate" bgColor="#b91c1c" textColor="#fff">
        <p>{error}</p>
      </Modal>
    </div>
  );
}