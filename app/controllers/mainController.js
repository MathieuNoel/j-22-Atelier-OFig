const dataMapper = require('../dataMapper');


const mainController = {

  // méthode pour la page d'accueil
 homePage :  async(_, res, next) => {
   try {
     const allFig = await dataMapper.getAllFigurines();
    res.render('accueil', {
      allFig
    });
   } catch (error) {
     
    
   }
    
  },

  // méthode pour la page article
  articlePage: async(req, res, next) => {
    const id = +req.params.id;
    
    try {  
      const modals = await dataMapper.getReviews(id);        
      const oneFig = await dataMapper.getOneFigurine(id);   
      res.render('article', {
      oneFig,
      modals
      });     
    } catch (error) {
      res.status(500).send(error);
    }    
  }
};


module.exports = mainController;
