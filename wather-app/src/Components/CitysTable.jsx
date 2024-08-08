/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const CitysTable = () => {
  const [citis, setCitis] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [filterCities, setFilterCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getCityesData = () => {
    setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
            (currentPage - 1) * 20
          }`
        );
        const newcities = res.data.results;

        setCitis((prevcities) => [...prevcities, ...newcities]);
        setCurrentPage((prevPage) => prevPage + 1);

        //
        if (newcities.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("error found", error);
      }
    }, 1000);
  };

  useEffect(() => {
    getCityesData();
  }, []);

  const handelSearch = (e) => {
    setSearchCity(e.target.value);
  };

  useEffect(() => {
    const filterCity = citis.filter((city) =>
      city.name.toLowerCase().includes(searchCity.toLowerCase())
    );
    setFilterCities(filterCity);
  }, [citis, searchCity]);

  const handelRightClick = (e, cityName) => {
    if (e.button == 2) {
      window.open(`/weather/${cityName},"_blank"`);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-center text-4xl font-bold mb-4">Cities Table</h2>
      <input
        type="text"
        placeholder="Search cities...."
        className="border-2 border-black px-3 py-4 rounded-lg  w-[40%]"
        onChange={handelSearch}
        value={searchCity}
      />
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <InfiniteScroll
                dataLength={citis.length}
                next={getCityesData}
                hasMore={hasMore}
                loader={<h4 className="text-center font-bold">Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No More Data To Load </b>
                  </p>
                }
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        TimeZone
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterCities.map((city, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 cursor-pointer"
                          onContextMenu={(e) => handelRightClick(e, city.name)}
                        >
                          <Link to={`/weather/${city.name}`}>{city.name}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {city.cou_name_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {city.timezone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitysTable;
