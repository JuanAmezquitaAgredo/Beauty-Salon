import { ServicesService } from "@/app/infrastucture/services/services.service";
import DataService from "@/ui/template/DataServices/dataServices";

interface IProps{
  searchParams: IServicesRequest;
}
const useServicesservice = new ServicesService();
export default async function ServicePage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
  const response = await useServicesservice.getAllServices({page, size: 10});

  return (
    <>
      <DataService data={response} pagination={response.pageable}/>
    </>
  )
}
