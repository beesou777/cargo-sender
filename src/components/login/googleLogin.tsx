import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Modal, Text } from '@mantine/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { notifications } from '@mantine/notifications';
import useAuthStore from '@/store/auth';
import { redirect } from 'next/navigation';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Google from '/public/assets/icons/google.png';

const getFirebaseClientApp = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAsgkkH4SiXMy00PoE0jqLCJh_3A5rgqXc',
    authDomain: 'cargosender-8005b.firebaseapp.com',
    projectId: 'cargosender-8005b',
    storageBucket: 'cargosender-8005b.appspot.com',
    messagingSenderId: '739740706034',
    appId: '1:739740706034:web:df2bb3e78550301578dc6b',
    measurementId: 'G-RBE6SQYZR2',
  };

  const app = initializeApp(firebaseConfig);
  return app;
};
const app = getFirebaseClientApp() as unknown as FirebaseApp;
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function LoginPage({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    redirect('/dashboard');
  }

  const loginHandler = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      authStore.setUser(response);
      notifications.show({
        title: `Welcome ${response.user.displayName}`,
        message: 'You have logged in successfully.',
        color: 'green',
      });
      onClose(); // Close the modal after successful login
    } catch (err) {
      console.error(err);
    }
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title="Login"
      styles={{
        header: {
          fontWeight: 'bold !important',
        },
      }}
      size={isMobile ? 'xs' : '300px'}
    >
      <div className="flex flex-col gap-4 items-center">
        <Image
          width={39}
          height={39}
          className="object-cover rounded-full overflow-hidden"
          src={Google}
          alt="Google logo"
        />
        <Button className="!w-full" onClick={loginHandler}>
          Login with Google
        </Button>
      </div>
    </Modal>
  );
}

export default LoginPage;
