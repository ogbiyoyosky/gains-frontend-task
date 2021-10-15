import './CustomTable.css'

function CustomTable({list_data, deleteItem}){

    let generate_table = []

    for (let i = list_data.length - 1; i >= 0; i--) {
        const list_element = list_data[i];
        let list_element_class = 'custom-table-item'

        if (list_element.isVerified) {
            list_element_class += ' success'
        } else {
            list_element_class += ' danger'
        }
        generate_table.push(
            <div className={list_element_class} key={i+1}>
                <div className="col-1">{list_data.length - i}</div>
                <div className="col-6">{list_element.emailAddress}</div>
                <div className="col-3">{list_element.isVerified ? 'verified': 'pending'}</div>
                <div className="col-2">
                 <button onClick={() => deleteItem(list_element.uuid)} className="btn btn-sm btn-danger">Delete</button>
                </div>
            </div>  
        )
    }
    return (
        <>
            {generate_table}       
        </>
    )
}

export default CustomTable