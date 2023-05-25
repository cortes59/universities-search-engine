import { useEffect, useMemo, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import UniversitiesTable from "./components/UniversitiesTable/UniversitiesTable";
import { IPaginationParams } from "./app/models/interfaces";
import { ConfigProvider, Input, Select, Typography } from "antd";
import { COUNTRIES } from "./constants/countries";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUniversities } from "./features/university/universitySlice";
import { useDebounce } from "usehooks-ts";

function App() {
  const [country, setCountry] = useState("United States");
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState<IPaginationParams>({
    current: 1,
    perPage: 10,
  });
  const debouncedSearch = useDebounce<string>(searchValue, 500);

  const { universities, loading } = useAppSelector((state) => state.university);
  const dispatch = useAppDispatch();

  const onPaginationChange = (current: number, perPage: number) => {
    setPagination({ current, perPage });
  };

  const filteredSearchResults = useMemo(() => {
    if (!universities.length || !debouncedSearch) {
      return universities;
    }

    return universities.filter((item) =>
      `${item.name}_${item["state-province"]}_${item.domains.join(
        "_"
      )}_${item.web_pages.join("_")}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [universities, debouncedSearch]);
  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      current: 1,
    }));

    console.log("FETCH");
    dispatch(fetchUniversities(country));
  }, [country, dispatch]);

  return (
    <ConfigProvider  theme={{token: { fontFamily: 'Poppins' }}}>

    <div className="App">
      <div className="universities-table-container">
        <Typography.Title>University Search Engine</Typography.Title>

        <div className="universities-filter">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200 }}
          />
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
          data={filteredSearchResults}
          loading={loading}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
    </ConfigProvider>
  );
}

export default App;
