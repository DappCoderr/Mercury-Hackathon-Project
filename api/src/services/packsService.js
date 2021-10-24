import { Packs } from "../models/packs";

class PacksService {
  listAllPacks = async () => {
    let packs = await Packs.query();
    return packs;
  };

  listAllSoldPacks = async () => {
    let sold_packs = await Packs.query().where("sold", "=", true);
    return sold_packs;
  };

  updateASoldStatusOfPack = async (packId, ownerId) => {
    let pack = await Packs.query().findById(packId);
    if (pack) {
      const updatedPack = await pack.$query().patchAndFetch({
        sold: true,
        owner_id: ownerId
      });
      return updatedPack;
    }
    throw "Pack Not Found";
  };
}

export default PacksService;
