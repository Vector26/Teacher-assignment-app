export const setSubjects=(Subs)=>{
    return (
        {
            type:"SET_SUBJECTS",
            data:Subs
        }
    )
}
export const setExams=(Subs)=>{
    return (
        {
            type:"SET_EXAMS",
            data:Subs
        }
    )
}
// export const addSubje=(data)=>{
//     return (
//         {
//             type:"SET_FEED",
//             feed:data
//         }
//     )
// }
// export const setBookings=(data)=>{
//     return (
//         {
//             type:"SET_BOOKINGS",
//             bookings:data
//         }
//     )
// }