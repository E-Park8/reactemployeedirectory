import React, { useState, useEffect } from 'react'
import 'react-table-v6/react-table.css'
import axios from 'axios'
import ReactTable from 'react-table-v6'

const App = () => {

    const [employeeState, setEmployeeState] = useState({
        employees: [],
        columns: [
            {
                
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Cell Phone #',
                accessor: 'cell'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Address',
                accessor: 'location'
            }
            
        ]
    })

    useEffect(() => {
        axios.get('https://randomuser.me/api?results=20')
            .then(({ data }) => {
                console.log(data.results)
                let employees = data.results.map(employee => ({
                    name: employee.name.first + ' ' + employee.name.last,
                    location: employee.location.street.number + ' ' + employee.location.street.name + ' '  + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode,
                    cell: employee.cell,
                    email: employee.email
                }))
                setEmployeeState({ ...employeeState, employees })
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <>
        
            <ReactTable
                data={employeeState.employees}
                columns={employeeState.columns}
            />
        </>
    )
}

export default App