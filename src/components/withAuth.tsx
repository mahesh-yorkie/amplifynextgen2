// components/withAuth.tsx

import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const Wrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/auth/signin'); // Redirect to login if not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
