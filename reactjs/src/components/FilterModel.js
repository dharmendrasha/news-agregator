import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from 'react'
import { getAvailableNewsOptions } from '../utils/api-list'
import { useNavigation, useSearchParams } from "react-router-dom";


export const FilterModal = (props) => {
     const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState(searchParams.get("q"));
    const [searchCategory, setCategoryValue] = React.useState(
      searchParams.get("category")
    );
    const [searchLanguage, setLangunageValue] = React.useState(
      searchParams.get("lang")
    );
  const [isLoading, setLoading] = React.useState(false);
    const [searchCountry, setCountryValue] = React.useState(
      searchParams.get("country")
    );
    const [searchSource, setSourceValue] = React.useState(
      searchParams.get("sources")
    );
    const [searchDate, setDateValue] = React.useState(
      searchParams.get("date")
    );

      const [availableSources, setAvailableSources] = React.useState([]);
      const [availableCategoryList, setAvailableCategoryList] = React.useState([]);
      const [availableLanguage, setAvailableLanguage] = React.useState([]);
      const [availableCountry, setAvailableCountry] = React.useState([]);


    const getDefaultValues = () => {
        setLoading(true);
        getAvailableNewsOptions()
          .then((v) => {
            setAvailableSources(v.sources);
            setAvailableCategoryList(v.category);
            setAvailableLanguage(v.language);
            setAvailableCountry(v.country);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
          });
    }

    React.useEffect(() => {
        getDefaultValues()
    }, [])
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form method="GET" action="/search">
          <div className="form-group">
            <label for="inputKeyWord" class="col-sm-2 col-form-label">
              KeyWord
            </label>
            <div class="col-sm-12">
              <input
                className="form-control"
                id="inputKeyWord"
                name="q"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="search by key word."
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputDate" class="col-sm-2 col-form-label">
              Date
            </label>
            <div class="col-sm-12">
              <input
                className="form-control"
                id="inputDate"
                name="date"
                type="date"
                value={searchDate}
                onChange={(e) => setDateValue(e.target.value)}
                placeholder="search by date."
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputCategory" class="col-sm-2 col-form-label">
              Category
            </label>
            <div class="col-sm-12">
              <select
                className="form-control"
                id="inputCategory"
                name="category"
                onChange={(e) => setCategoryValue(e.target.value)}
              >
                <option selected value={""}>
                  Please select Category
                </option>
                {Array.isArray(availableCategoryList) &&
                  availableCategoryList.map((v) => {
                    if (v === searchCategory) {
                      return (
                        <option selected value={v}>
                          {v}
                        </option>
                      );
                    }
                    return (
                      <>
                        <option value={v}>{v}</option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="inputSourced" class="col-sm-2 col-form-label">
              Source
            </label>
            <div class="col-sm-12">
              <select
                className="form-control"
                id="inputSourced"
                name="sources"
                onChange={(e) => setSourceValue(e.target.value)}
              >
                <option selected value={""}>
                  Please select sources
                </option>
                {Array.isArray(availableSources) &&
                  availableSources.map((v) => {
                    if (v.id === searchSource) {
                      return (
                        <>
                          <option selected value={v.id}>
                            {v.name}
                          </option>
                        </>
                      );
                    }
                    return (
                      <>
                        <option value={v.id}>{v.name}</option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="inputLanguage" class="col-sm-2 col-form-label">
              Language
            </label>
            <div class="col-sm-12">
              <select
                className="form-control"
                id="inputLanguage"
                name="lang"
                onChange={(e) => setLangunageValue(e.target.value)}
              >
                <option selected value={""}>
                  Please select language
                </option>
                {Array.isArray(availableLanguage) &&
                  availableLanguage.map((v) => {
                    if (v === searchLanguage) {
                      return (
                        <option selected value={v}>
                          {v}
                        </option>
                      );
                    }
                    return (
                      <>
                        <option value={v}>{v}</option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="inputCountry" class="col-sm-2 col-form-label">
              Country
            </label>
            <div class="col-sm-12">
              <select
                className="form-control"
                id="inputCountry"
                name="country"
                onChange={(e) => setCountryValue(e.target.value)}
              >
                <option selected value={""}>
                  Please select Country
                </option>
                {Array.isArray(availableCountry) &&
                  availableCountry.map((v) => {
                    if (v === searchCountry) {
                      return (
                        <option selected value={v}>
                          {v}
                        </option>
                      );
                    }
                    return (
                      <>
                        <option value={v}>{v}</option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btn btn-danger">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
