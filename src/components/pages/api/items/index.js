import { Item } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";
import { Op } from "sequelize";

const lookforItems = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 5,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.like]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.stockye?.trim()) {
        where.stockye = {
            [Op.eq]: req.query.stockye,
        };
    }
    const result = await Item.findAll({
        attributes: ["id", "name", "stockye", "price"],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: ["name", "ASC"],
    });
    const total = await Item.count({
        where,
    });
    console.log(result, total);
    res.status(200).json({
        data: result,
        total,
    });
};
const createItem = async (req, res) => {
    const newItem = JSON.parse(req.body);
    const newRecord = await Item.create({
        name: newItem.name,
        price: newItem.price,
        stockye: newItem.stockye,
    });
    res.status(200).json({
        id: newRecord.id,
    });
};
export default async function handler(req, res) {
    const user = await validateRequest(req);
    if (!user) {
        res.status(401).json({
            message: "you shall not pass",
        });
        return;
    }
    if (req.method === "POST") {
        return createItem(req, res);
    } else if (req.method === "GET") {
        return lookforItems(req, res);
    }
    res.status(405).json({
        message: "hold it right there, pal. what do you think you're trying to do?",
    });
}