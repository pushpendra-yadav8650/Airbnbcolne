module.exports = (fn)=>{
    return ((_req,_res,_next)=>{
        fn(_req,_res,_next).catch(_next);
    });
}