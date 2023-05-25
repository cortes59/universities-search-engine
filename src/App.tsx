import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import UniversitiesTable from "./components/UniversitiesTable/UniversitiesTable";
import { IPaginationParams } from "./app/models/interfaces";
import { Select } from "antd";
import { COUNTRIES } from "./constants/countries";

function App() {
  const [country, setCountry] = useState("United States");
  const [pagination, setPagination] = useState<IPaginationParams>({
    current: 1,
    perPage: 10,
  });

  const onPaginationChange = (current: number, perPage: number) => {
    setPagination({ current, perPage });
  };

  useEffect(() => {}, [country, setPagination]);

  return (
    <div className="App">
      <div className="universities-table-container">
        <div className="universities-filter">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={COUNTRIES}
            value={country}
            onChange={setCountry}
          />
          {/* <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button> */}
        </div>
        <UniversitiesTable
          className="universities-table"
          data={[]}
          loading={false}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  );
}

export default App;
