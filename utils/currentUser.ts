import { cookies } from "next/headers";

const currentUser = async () => {
  const jwt = await (await cookies()).get("jwt")
  const data = await fetch(`${process.env.NEXT_PUBLIC_APIBASE}/my/profile`, {
      headers: {
    Accept: "application/json",
    Authorization:
      "Bearer " + jwt?.value ,
  },
  cache: "no-store"
  });
  const res = await data.json();
  return (res);
}

export default currentUser;
