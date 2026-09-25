import { EmployeeService } from "@/app/infrastucture/services/employee.service";
import DataEmployees from "@/ui/template/DataEmployees/dataEmployees";

interface IProps{
  searchParams: IEmployRequest;
}
const useEmployeeService = new EmployeeService();
export default async function EmployePage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
  const response = await useEmployeeService.getAllEmployees({page, size: 10});

  return (
    <>
      <DataEmployees data={response} pagination={response.pageable}/>
    </>
  )
}
