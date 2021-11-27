import { Auth } from '@supabase/ui';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { LayoutErrorBoundary } from 'src/layout/LayoutErrorBoundary';
import { client } from 'src/libs/supabase';

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  const { user } = Auth.useUser();

  console.log(user);
  return (
    <div>
      <div>
        <Header />
        <main>
          <LayoutErrorBoundary>
            {user ? (
              <div>
                <div>{props.children}</div>
                <button onClick={() => client.auth.signOut()}>Sign out</button>
              </div>
            ) : (
              <div className="flex justify-center pt-8">
                <div className="w-full sm:w-96">
                  <h1 className="mb-4 text-2xl font-bold">
                    OverLangで世界を広げる？
                  </h1>
                  <Auth
                    supabaseClient={client}
                    providers={['google', 'twitter', 'github']}
                    socialColors={true}
                    magicLink
                  />
                </div>
              </div>
            )}
          </LayoutErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
};
