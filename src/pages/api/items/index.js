import { Item } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";
import { Op } from "sequelize";

const lookforItems = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 10,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.iLike]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.gender?.trim()) {
        where.gender = {
            [Op.eq]: req.query.gender,
        };
    }
    const attrb = {
        attributes: ["id", "name", "gender", "pid", "dob", "address", "phone", "icd10", "med_history", "osd", "diagdate", "med_records", "biopsy_location", "biopsy", "broken_bones_complications", "tumor_size", "skip_lesion", "tumor_vs_limb", "createdAt", "updatedAt" ],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: [["id", "ASC"]], 
    }
    const result = await Item.findAll(attrb);

    const total = await Item.count({
        where,
    });
    console.log(result, total);
    res.status(200).json({
        data: result,
        total,
    });
};
const lookforItemsCreateAscending = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 10,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.iLike]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.gender?.trim()) {
        where.gender = {
            [Op.eq]: req.query.gender,
        };
    }
    const attrb = {
        attributes: ["id", "name", "gender", "pid", "dob", "address", "phone", "icd10", "med_history", "osd", "diagdate", "med_records", "biopsy_location", "biopsy", "broken_bones_complications", "tumor_size", "skip_lesion", "tumor_vs_limb", "createdAt", "updatedAt" ],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: [["createdAt", "ASC"]], 
    }
    const result = await Item.findAll(attrb);

    const total = await Item.count({
        where,
    });
    console.log(result, total);
    res.status(200).json({
        data: result,
        total,
    });
};
const lookforItemsCreateDescending = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 10,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.iLike]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.gender?.trim()) {
        where.gender = {
            [Op.eq]: req.query.gender,
        };
    }
    const attrb = {
        attributes: ["id", "name", "gender", "pid", "dob", "address", "phone", "icd10", "med_history", "osd", "diagdate", "med_records", "biopsy_location", "biopsy", "broken_bones_complications", "tumor_size", "skip_lesion", "tumor_vs_limb", "createdAt", "updatedAt" ],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: [["createdAt", "DESC"]], 
    }
    const result = await Item.findAll(attrb);

    const total = await Item.count({
        where,
    });
    console.log(result, total);
    res.status(200).json({
        data: result,
        total,
    });
};
const lookforItemsUpdateAscending = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 10,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.iLike]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.gender?.trim()) {
        where.gender = {
            [Op.eq]: req.query.gender,
        };
    }
    const attrb = {
        attributes: ["id", "name", "gender", "pid", "dob", "address", "phone", "icd10", "med_history", "osd", "diagdate", "med_records", "biopsy_location", "biopsy", "broken_bones_complications", "tumor_size", "skip_lesion", "tumor_vs_limb", "createdAt", "updatedAt" ],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: [["updatedAt", "ASC"]], 
    }
    const result = await Item.findAll(attrb);

    const total = await Item.count({
        where,
    });
    console.log(result, total);
    res.status(200).json({
        data: result,
        total,
    });
};const lookforItemsUpdateDescending = async (req, res) => {
    const query = {
        ...req.query,
        pageIndex: +req.query.pageIndex || 0,
        itemsPerPage: +req.query.itemsPerPage || 10,
    };
    const where = {};
    if (req.query.searchTerm?.trim()) {
        where.name = {
            [Op.iLike]: `%${req.query.searchTerm}%`,
        };
    }
    if (req.query.gender?.trim()) {
        where.gender = {
            [Op.eq]: req.query.gender,
        };
    }
    const attrb = {
        attributes: ["id", "name", "gender", "pid", "dob", "address", "phone", "icd10", "med_history", "osd", "diagdate", "med_records", "biopsy_location", "biopsy", "broken_bones_complications", "tumor_size", "skip_lesion", "tumor_vs_limb", "createdAt", "updatedAt" ],
        where,
        offset: query.pageIndex * query.itemsPerPage,
        limit: query.itemsPerPage,
        order: [["updatedAt", "DESC"]], 
    }
    const result = await Item.findAll(attrb);

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
        pid: newItem.pid,
        gender: newItem.gender,
        dob: newItem.dob,
        address: newItem.address,
        phone: newItem.phone,
        icd10: newItem.icd10,
        med_history: newItem.med_history,
        osd: newItem.osd,
        diagdate: newItem.diagdate,
        med_records: newItem.med_records,
        biopsy_location: newItem.biopsy_location,
        biopsy: newItem.biopsy,
        broken_bones_complications: newItem.broken_bones_complications,
        tumor_size: newItem.tumor_size,
        skip_lesion: newItem.skip_lesion,
        tumor_vs_limb: newItem.tumor_vs_limb,
    });
    res.status(200).json({
        id: newRecord.id,
    });
};
export default async function handler(req, res) {
    try {
    const user = await validateRequest(req);
    if (!user) {
        res.status(401).json({
            message: "you shall not pass",
        });
        return;
    }
    if (req.method === "POST") {
        return createItem(req, res);
    } else if (req.method === "GET" && req.query.state === "0") {
        return lookforItems(req, res);
    } else if (req.method === "GET" && req.query.state === "1") {
        return lookforItemsCreateAscending(req, res);
    } else if (req.method === "GET" && req.query.state === "2") {
        return lookforItemsCreateDescending(req, res);
    } else if (req.method === "GET" && req.query.state === "3") {
        return lookforItemsUpdateAscending(req, res);
    } else if (req.method === "GET" && req.query.state === "4") {
        return lookforItemsUpdateDescending(req, res);
    }
    res.status(405).json({
        message: "hold it right there, pal. what do you think you're trying to do?",
    });
    } catch (err) {
        console.log(err);
        throw err;
    }
} 