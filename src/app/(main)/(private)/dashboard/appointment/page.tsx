import { AppointmentService } from "@/app/infrastucture/services/appointment.service";
import DataAppointments from "@/ui/template/DataAppointments/dataAppointments";

interface IProps{
  searchParams: { page?: string };
}
const useAppointmentService = new AppointmentService();
export default async function AppointmentPage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
  const response = await useAppointmentService.getAllAppointments({page, size: 10});

  return (
    <>
      <DataAppointments data={response} pagination={response.pageable}/>
    </>
  )
}
