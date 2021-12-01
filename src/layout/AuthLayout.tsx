import { Auth } from "@supabase/ui";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { LayoutErrorBoundary } from "src/layout/LayoutErrorBoundary";
import { client, getProfile } from "src/libs/supabase";
import { createContext, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

const AppContext = createContext<{ id: number | null; uid: string }>({
  id: null,
  uid: "",
});

export function useAppContext() {
  return useContext(AppContext);
}

export const AuthLayout = (props: Props) => {
  const [id, setId] = useState<number | null>(null);
  const [uid, setUid] = useState<string>("");
  const [name, setName] = useState<string>("User");
  const [editName, setEditName] = useState<string>("User");
  const [iconExists, setIconExists] = useState<boolean>(false);
  const [icon, setIcon] = useState<string | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  const { user } = Auth.useUser();
  const getUserInfo = useCallback(async () => {
    if (!user) return <div>loading</div>;
    const userInfo = await getProfile(user.id);
    if (userInfo) {
      setId(userInfo.id);
      setName(userInfo.user_name);
      setEditName(userInfo.user_name);
      setIconExists(userInfo.icon);
      if (uid && userInfo.icon) {
        const { error, signedURL } = await client.storage
          .from("avatar")
          .createSignedUrl("private/" + uid + ".jpg", 600);
        if (!error) {
          setIcon(signedURL);
          setPreviewIcon(signedURL);
        }
      }
    }
  }, [user, uid]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  console.log(user);
  return (
    <div>
      <div>
        <Header />
        <main>
          <LayoutErrorBoundary>
            {user ? (
              <div>
                <AppContext.Provider value={{ id: id, uid: uid }}>
                  <div>{props.children}</div>
                </AppContext.Provider>

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
                    providers={["google", "twitter", "github"]}
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
