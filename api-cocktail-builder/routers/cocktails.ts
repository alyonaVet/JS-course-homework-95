import express from 'express';
import mongoose from 'mongoose';
import auth, {checkUser, RequestWithUser} from '../middleware/auth';
import Cocktail from '../models/Cocktail';
import {imagesUpload} from '../multer';
import {CocktailFields, Ingredient} from '../types';
import {parseIngredients} from '../helpers/parseIngredients';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', checkUser, async (req: RequestWithUser, res, next) => {
  try {
    const isAdmin = req.user !== undefined && req.user.role === 'admin';
    const userFilter = isAdmin ? {} : {isPublished: true};

    const cocktails = await Cocktail.find(userFilter);

    return res.send(cocktails);

  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const ingredients = parseIngredients(req.body.ingredients);

    const cocktailData: CocktailFields = {
      user: req.body.user,
      title: req.body.title,
      recipe: req.body.recipe,
      image: req.file ? req.file.filename : null,
      ingredients,
    };

    const cocktail = new Cocktail(cocktailData);
    await cocktail.save();

    return res.send(cocktail);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Cocktail ID is not valid'});
    }
    const cocktail = await Cocktail.findById(req.params.id);

    if (cocktail === null) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    return res.send(cocktail);

  } catch (error) {
    return next(error);
  }
});


export default cocktailsRouter;
