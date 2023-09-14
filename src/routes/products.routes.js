import { Router } from 'express';
import productModel from '../models/products.models.js';

const routerProd = Router();

routerProd.get('/', async (req, res) => {
	const { limit, page, sort, category, status } = req.query;
	let sortOption;
	sort == 'asc' && (sortOption = 'price');
	sort == 'desc' && (sortOption = '-price');

	const options = {
		limit: limit || 10,
		page: page || 1,
		sort: sortOption || null,
	};

	const query = {};
	category && (query.category = category);
	status && (query.status = status);

	try {
		const prods = await productModel.paginate(query, options);
		res.status(200).send({ resultado: 'OK', message: prods });
	} catch (error) {
		res.status(400).send({ error: `Error al consultar productos: ${error}` });
	}
});

export default routerProd;
