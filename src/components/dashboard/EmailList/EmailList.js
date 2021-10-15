import CustomTable from "../../uis/utils/lists/CustomTable/CustomTable";

function EmailList({
  list_data,
  list_active_data,
  list_in_active_data,
  deleteItem,
}) {
  return (
    <>
      <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="all-emails-tab"
            data-toggle="tab"
            href="#all-emails"
            role="tab"
            aria-controls="all-emails"
            aria-selected="true"
          >
            All Emails
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="active-emails-tab"
            data-toggle="tab"
            href="#active-emails"
            role="tab"
            aria-controls="active-emails"
            aria-selected="false"
          >
            Active Emails
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="inactive-tab"
            data-toggle="tab"
            href="#inactive"
            role="tab"
            aria-controls="inactive"
            aria-selected="false"
          >
            Inactive Emails
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active "
          id="all-emails"
          role="tabpanel"
          aria-labelledby="all-emails-tab"
        >
          {list_data.length ? (
            <CustomTable
              deleteItem={(uuid) => deleteItem(uuid)}
              list_data={list_data}
            />
          ) : (
            <h6>No emails. You can start by creating one</h6>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="active-emails"
          role="tabpanel"
          aria-labelledby="active-emails-tab"
        >
          {list_active_data.length ? (
            <CustomTable
              deleteItem={(uuid) => deleteItem(uuid)}
              list_data={list_active_data}
            />
          ) : (
            <h6>No active emails. You can start by creating one</h6>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="inactive"
          role="tabpanel"
          aria-labelledby="inactive-tab"
        >
          {" "}
          {list_in_active_data.length ? (
            <CustomTable
              deleteItem={(uuid) => deleteItem(uuid)}
              list_data={list_in_active_data}
            />
          ) : (
            <h6>No in active emails. You can start by creating one</h6>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailList;
