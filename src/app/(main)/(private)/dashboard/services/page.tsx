import { authOptions } from "@/app/api/auth";
import { AuthService } from "@/app/infrastucture/services/auth.services";
import { IGetServiceRequest } from "@/models/RequestApi/requestApi.models";
import DataService from "@/ui/template/DataServices/dataServices";
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

interface IProps{
  searchParams: IGetServiceRequest;
}
const useServicesservice = new AuthService();
export default async function ServicePage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
  const session = await getServerSession(authOptions) as Session;
  if (!session) {
    return <div>Loading...</div>
  }
  const token = session.user.token as string;
  const response = await useServicesservice.getAllServices({page, token, size: 10});

  return (
    <>
      <DataService data={response} pagination={response.pageable}/>
    </>
  )
}
