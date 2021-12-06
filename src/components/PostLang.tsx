import axios from "axios";
import { useState } from "react";
import { client } from "src/libs/supabase";

type PostLangProps = {
  users_id: string;
};
export const PostLang = (props: PostLangProps) => {
  const [body, setBody] = useState("");
  const postLang = async (users_id: string, body: string) => {
    const translateAPI =
      "https://script.google.com/macros/s/AKfycbxdObsyAVIBl_viwOXd2Pqda_uBcL5edZNWTCz4T0yFIDT8hnJ00hs6uIdmFzl6CbP9/exec";
    const response = await axios.get(`${translateAPI}?word=${body}`);
    const { error } = await client
      .from("langs")
      .insert({
        users_id: users_id,
        body: body,
        translated_body: response.data.result,
      });
    if (!error) {
      setBody("");
      return;
    }
  };

  return (
    <div>
      <input
        value={body}
        type="text"
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button onClick={() => postLang(props.users_id, body)}>Langs!</button>
    </div>
  );
};
