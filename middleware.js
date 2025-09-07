const Travel=require("./models/looping.js")

module.exports.isLoggedIn=(req,res,next)=>{
  //  console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","your not the owner of the TravelLoop");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let travel=await Travel.findById(id);   
    if(!travel.owner.equals(res.locals.currUser._id)){
      req.flash("error","you dont have permission to edit")
      return res.redirect(`/travel/${id}`);
    
    }
    next();
}

