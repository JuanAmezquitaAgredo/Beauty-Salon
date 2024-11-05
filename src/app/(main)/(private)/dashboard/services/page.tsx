import { authOptions } from "@/app/api/auth";
import { AuthService } from "@/app/infrastucture/services/auth.services";
import HeaderComponent from "@/ui/organisms/header/header";
import { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth/next";

interface Session extends DefaultSession {
  user: {
      id?: string;
      token?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
  };
}
const useServicesservice = new AuthService();
export default async function ServicePage() {

  const session = await getServerSession(authOptions) as Session;
  if (!session) {
    return <div>Loading...</div>
  }
  const token = session.user.token as string;
  const response = await useServicesservice.getAllServices(token);
  console.log(response);

  return (
    <>
    desde servicios
    </>
  )
}
