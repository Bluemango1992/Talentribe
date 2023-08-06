import { createSlice } from '@reduxjs/toolkit';

const candidateData = [
    { id: '1', name: 'John Smith', ReviewDate: 'August 3, 2023', ResponsibleAgent: 'Jane Doe', AddedBy: 'Bob Johnson', ReviewStatus: 'Open' },
    { id: '2', name: 'Mary Jones', ReviewDate: 'August 2, 2023', ResponsibleAgent: 'John Doe', AddedBy: 'Sarah Lee', ReviewStatus: 'In Progress' }, 
    { id: '3', name: 'Steve Williams', ReviewDate: 'August 1, 2023', ResponsibleAgent: 'Mike Wilson', AddedBy: 'Emily Davis', ReviewStatus: 'Closed' },
    { id: '4', name: 'Samantha Miller', ReviewDate: 'July 31, 2023', ResponsibleAgent: 'Jessica Moore', AddedBy: 'Chris Martin', ReviewStatus: 'Open' },
    { id: '5', name: 'David Brown', ReviewDate: 'July 30, 2023', ResponsibleAgent: 'Ashley Rodriguez', AddedBy: 'Ryan Clark', ReviewStatus: 'In Review' },
    { id: '6', name: 'Michelle Davis', ReviewDate: 'July 29, 2023', ResponsibleAgent: 'Daniel Lee', AddedBy: 'Elizabeth Thomas', ReviewStatus: 'Closed' },
    { id: '7', name: 'Michael Rodriguez', ReviewDate: 'July 28, 2023', ResponsibleAgent: 'Robert Garcia', AddedBy: 'Jennifer Wilson', ReviewStatus: 'Open'},
    { id: '8', name: 'Jessica Lee', ReviewDate: 'July 27, 2023', ResponsibleAgent: 'David Hernandez', AddedBy: 'William Martinez', ReviewStatus: 'In Progress' },
    { id: '9', name: 'William Martinez', ReviewDate: 'July 26, 2023', ResponsibleAgent: 'Jennifer Lopez', AddedBy: 'Michael Rodriguez', ReviewStatus: 'In Review' }
  ]

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState: candidateData,
    reducers: {},
  });
  
  export default candidatesSlice.reducer;