module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
// module.exports = func => {
//     return (req, res, next) => {
//         func(req, res, next).catch(err => {
//             err.message = 'Page Not Found'
//             res.status(500).render('error', { err });
//         });
//     };
// };

