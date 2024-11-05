'use client'
import ButtonPag from "@/ui/atoms/buttonPag";
import TableComponent from "@/ui/molecules/common/Table";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

interface MainProps {
    onEdit?: (rowIndex: number) => void;
    onDelete?: (rowIndex: number) => void;
    pagination: Pageable
    data: IServicesResponse
}

const Pagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
`;

const MainContent = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

export default function MainComponent({ data, onEdit, onDelete, pagination }: MainProps) {

    const searchParams = useSearchParams();
    const router = useRouter();

    const HandleClickNext = (nextPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (nextPage <= data.totalPages) {
            params.set('page', nextPage.toString());
            router.push(`?${params.toString()}`);
        }
    };

    const HandleClickBack = (backPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (backPage > 0) {
            params.set('page', backPage.toString());
            router.push(`?${params.toString()}`);
        }
    };

    const courrentPage = pagination.pageNumber + 1;

    const content = data.content;
    const thead = content.length > 0 ? Object.keys(content[0]) : [];

    const tbody = content;

    return (
        <MainContent>
            <TableComponent thead={thead} tbody={tbody} onEdit={onEdit} onDelete={onDelete} />
            <Pagination>
                <ButtonPag label="<" onClick={() => HandleClickBack(courrentPage - 1)} />
                Página {courrentPage} de {data.totalPages}
                <ButtonPag label=">" onClick={() => HandleClickNext(courrentPage + 1)} />
            </Pagination>
        </MainContent>
    )
}