import express from 'express';
import mongoose from 'mongoose';
import auth, {checkUser, RequestWithUser} from '../middleware/auth';
import Cocktail from '../models/Cocktail';
import {imagesUpload} from '../multer';
import {CocktailFields} from '../types';
import {parseIngredients} from '../helpers/parseIngredients';
import permit from '../middleware/permit';


const cocktailsRouter = express.Router();

cocktailsRouter.get('/', checkUser, async (req: RequestWithUser, res, next) => {
  try {
    let cocktails;

    if (req.user && req.user.role === 'admin') {
      cocktails = await Cocktail.find();
    } else {
      const publishedCocktails = await Cocktail.find({ isPublished: true });

      if (req.user) {
        const userCocktails = await Cocktail.find({ user: req.user._id, isPublished: false });
        cocktails = publishedCocktails.concat(userCocktails);
      } else {
        cocktails = publishedCocktails;
      }
    }

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

cocktailsRouter.get('/my-cocktails', checkUser, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }
    const userCocktails = await Cocktail.find({ user: req.user._id });

    return res.send(userCocktails);
  } catch (error) {
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

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Cocktail ID is not valid'});
    }

    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    cocktail.isPublished = !cocktail.isPublished;

    await cocktail.save();

    return res.send(cocktail);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Cocktail ID is not valid'});
    }

    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    await Cocktail.findByIdAndDelete(req.params.id);

    return res.send({message: 'Cocktail was deleted successfully.'});

  } catch (error) {
    return next(error);
  }
});


export default cocktailsRouter;
