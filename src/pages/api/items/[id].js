import { Item } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";

const getItem = async (req, res) => {
    const id = +req.query.id;
    if (isNaN(id)) {
        res.status(400).json({
            message: "must be a number",
        });
        return;
    }
    const item = await Item.findByPk(id);
    if (!item) {
        res.status(404).json({
            message: "do we even have this?",
        });
        return;
    }
    res.status(200).json(item.toJSON());
};
const update = async (req, res) => {
    const id = +req.query.id;
    const updatedData = JSON.parse(req.body);
    const item = await Item.findByPk(id);
    if (!item) {
        res.status(404).json({
            message: "do we even have this?"
        });
        return;
    }
    item.update({
        name: updatedData.name,
        pid: updatedData.pid,
        gender: updatedData.gender,
    });
    res.status(200).json({});
};
const remove = async (req, res) => {
    await Item.destroy({
        where: {
            id:+req.query.id,
        },
    });
    res.status(200).json({});
};

export default async function handler(req, res) {
    const user = await validateRequest(req);
    if (!user) {
        res.status(401).json({
            message: "you shall not pass",
        });
        return;
    }
    if (req.method === "PATCH") {
        return update(req, res);
    } else if (req.method === "DELETE") {
        return remove(req, res);
    } else if (req.method === "GET") {
        return getItem(req, res);
    }
    res.status(405).json({
        message: "hold it right there, pal. what do you think you're trying to do?",
    });
}