import { ClientService } from "@/app/infrastucture/services/client.service";
import DataClients from "@/ui/template/DataClients/dataClients";

interface IProps{
  searchParams: IClientsRequest;
}
const useServicesservice = new ClientService();
export default async function ServicePage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
  const response = await useServicesservice.getAllClients({page, size: 10});

  return (
    <>
      <DataClients data={response} pagination={response.pageable}/>
    </>
  )
}