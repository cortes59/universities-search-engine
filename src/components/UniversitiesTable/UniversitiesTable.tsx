import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IPaginationParams, IUniversity } from "../../app/models/interfaces";

const columns: ColumnsType<IUniversity> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Domains",
    dataIndex: "domains",
    render: (domains: string[], record: IUniversity) => {
      if (domains.length) {
        return (
          <div>
            {domains.map((domain) => (
              <div key={`${record.name}-${domain}`}>
                <a target="_blank" rel="noreferrer" href={domain}>
                  {domain}
                </a>
              </div>
            ))}
          </div>
        );
      }

      return "-";
    },
  },
  {
    title: "Web Pages",
    dataIndex: "web_pages",
    render: (webPages: string[], record: IUniversity) => {
      if (webPages.length) {
        return (
          <div>
            {webPages.map((webPage) => (
              <div key={`${record.name}-${webPage}`}>
                <a target="_blank" rel="noreferrer" href={webPage}>
                  {webPage}
                </a>
              </div>
            ))}
          </div>
        );
      }

      return "-";
    },
  },
  {
    title: "State/Province",
    dataIndex: "state-province",
    sorter: true,
    render: (state: string | null) => state ?? "-",
  },
  {
    title: "Country",
    dataIndex: "country",
    render: (country: string) => country,
  },
];

const UniversitiesTable = ({
  data,
  loading,
  pagination,
  className,
  onPaginationChange = () => {},
}: {
  data: IUniversity[];
  loading: boolean;
  pagination: IPaginationParams;
  className?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
}) => {
  return (
    <Table
      className={className}
      columns={columns}
      rowKey={(record) => `${record.name}-${record.country}`}
      dataSource={data}
      pagination={{ onChange: onPaginationChange, ...pagination }}
      loading={loading}
      //   onChange={handleTableChange}
    />
  );
};

export default UniversitiesTable;
