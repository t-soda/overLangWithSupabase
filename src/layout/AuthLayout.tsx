import { Auth } from "@supabase/ui";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { LayoutErrorBoundary } from "src/layout/LayoutErrorBoundary";
import { client, getProfile } from "src/libs/supabase";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  const { user } = Auth.useUser();
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
                  <h1 className="mb-4 text-2xl font-bold">Over？</h1>
                  <Auth
                    supabaseClient={client}
                    // providers={["google", "twitter", "github"]}
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
