const dynamicSidebarRender = (req,res,next) => {
    res.locals.currentSection="home"
    next()
}

export default dynamicSidebarRender