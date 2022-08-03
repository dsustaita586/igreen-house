"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class HistoricoDAO {
    getTempByDates(inicio, fin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT DATE(fechaRegistro) as fecha, SUM(temperatura) / COUNT(cveTemperatura) as dato "
                    + " FROM tbl_temperatura "
                    + " WHERE DATE(fechaRegistro) BETWEEN ? AND ? "
                    + " GROUP BY DATE(fechaRegistro) ", [inicio, fin]);
            }));
            return result;
        });
    }
    getHumByDates(inicio, fin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT DATE(fechaRegistro) as fecha, SUM(humedad) / COUNT(cveHumedad) as dato "
                    + " FROM tbl_humedad "
                    + " WHERE DATE(fechaRegistro) BETWEEN ? AND ? "
                    + " GROUP BY DATE(fechaRegistro) ", [inicio, fin]);
            }));
            return result;
        });
    }
    getPPMByDates(inicio, fin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT DATE(fechaRegistro) as fecha, SUM(ppm) / COUNT(cvePpm) as dato "
                    + " FROM tbl_ppm "
                    + " WHERE DATE(fechaRegistro) BETWEEN ? AND ? "
                    + " GROUP BY DATE(fechaRegistro) ", [inicio, fin]);
            }));
            return result;
        });
    }
}
const dao = new HistoricoDAO();
exports.default = dao;
