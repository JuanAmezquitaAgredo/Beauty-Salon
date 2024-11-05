import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Sidebar = styled.nav`
  left: 0;
  width: 250px;
  height: 90vh;
  background-color: #FAF3EF;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin: 15px 0;
`;

const StyledLinkWrapper = styled.div<{$isActive: boolean}>`
  a {
    color: ${(props) => (props.$isActive ? "#fff" : "#aaa")};
    background-color: ${(props) => (props.$isActive ? "#B8A1C9" : "transparent")};
    text-decoration: none;
    font-size: 20px;
    padding: 10px;
    display: block;
    border-radius: 5px;
    
    &:hover {
      background-color: #9e89b2;
      color: #fff;
    }
  }
`;

export default function SideBarComponent() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarList>
        <SidebarItem>
          <StyledLinkWrapper $isActive={pathname === "/dashboard/services"}>
            <Link href="/dashboard/services">Servicios</Link>
          </StyledLinkWrapper>
        </SidebarItem>
        <SidebarItem>
          <StyledLinkWrapper $isActive={pathname === "/dashboard/appointment"}>
            <Link href="/dashboard/appointment">Citas</Link>
          </StyledLinkWrapper>
        </SidebarItem>
        <SidebarItem>
          <StyledLinkWrapper $isActive={pathname === "/dashboard/employe"}>
            <Link href="/dashboard/employe">Empleados</Link>
          </StyledLinkWrapper>
        </SidebarItem>
        <SidebarItem>
          <StyledLinkWrapper $isActive={pathname === "/dashboard/clients"}>
            <Link href="/dashboard/clients">Clientes</Link>
          </StyledLinkWrapper>
        </SidebarItem>
      </SidebarList>
    </Sidebar>
  );
}
