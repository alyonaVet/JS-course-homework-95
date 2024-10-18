import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [admin, user1] = await User.create({
      email: 'admin@gmail.com',
      password: '1234#',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'ADMIN',
      avatar: 'fixtures/admin.png',
    }, {
      email: 'user1@gmail.com',
      password: '1234@',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'John Doe',
      avatar: 'fixtures/person.png',
    }
  );

  await Cocktail.create({
      user: admin,
      title: 'Mojito',
      image: 'fixtures/mojito.png',
      recipe: 'To make a Mojito, begin by placing 10-12 fresh mint leaves and half a lime (cut into four wedges) in a sturdy glass. Add two tablespoons of sugar to the mixture. Using a muddler or the back of a spoon, gently press and twist the mint and lime together to release their flavors, but be careful not to over-muddle to avoid bitterness. Next, pour in two shots of light rum and fill the glass with crushed ice. Top it off with club soda, then gently stir to combine the ingredients. Garnish with a sprig of mint and a lime wedge, and enjoy your refreshing Mojito!',
      isPublished: true,
      ingredients: [{
        name: 'Light gold rum',
        amount: '2 shot'
      }, {
        name: 'Mint',
        amount: '14 leaves'
      }, {
        name: 'Lime juice',
        amount: '1/2 shot'
      }, {
        name: 'Sugar syrup',
        amount: '1/3 shot'
      }
      ]
    },
    {
      user: user1,
      title: 'Margarita',
      image: 'fixtures/margarita.jpeg',
      recipe: 'To make a Margarita, begin by rimming the glass with lime and dipping it into salt. In a cocktail shaker, combine two shots of tequila, one shot of freshly squeezed lime juice, and one shot of triple sec (such as Cointreau). Add ice to the shaker, then shake vigorously to blend and chill the mixture. Strain the Margarita into the prepared glass filled with ice, and garnish with a lime wheel for an extra touch of flavor. Sit back and enjoy the perfect balance of tangy, sweet, and salty in every sip of your Margarita!',
      isPublished: false,
      ingredients: [{
        name: 'Tequila',
        amount: '2 shot'
      }, {
        name: 'Lime juice',
        amount: '1 shot'
      }, {
        name: 'Triple sec',
        amount: '1 shot'
      }, {
        name: 'Salt for rimming',
        amount: 'To taste'
      }]
    }
  );

  await db.close();
};

run().catch(console.error);