import json
import os


def _ouvrir_json(doc, rel_à=None):
    if rel_à is not None:
        if len(os.path.splitext(rel_à)[1]):
            rel_à = os.path.split(rel_à)[0]
        rel_à = os.path.dirname(rel_à)
        doc = os.path.join(rel_à, doc)
    with open(doc, encoding='utf8') as d:
        return json.load(d)


class réf(object):
    def __init__(ri, info=None, rel_à=None):
        ri.info = _ouvrir_json("kinuk'.json")
        if isinstance(info, dict):
            ri.info.update(info)
        else:
            ri.info.update(_ouvrir_json(info), rel_à=rel_à)

    def langues(ri):
        return list(ri.info)

    def codes(ri, système="nuchab'äl"):
        système = ri._valid_système(système)
        return [x[système] for x in ri.info.values() if système in x]

    def langue(ri, code, système=None):

        if système is None:
            return next(x for x, d in ri.info.items() if any(s == code for s in d.values()))
        else:
            système = ri._valid_système(système)
            return next(x for x, d in ri.info.items() if d[système] == code)

    @staticmethod
    def _valid_système(système):
        if système == "nuchab'äl":
            return "runuk'"
        if système == 'iso':
            return "rumajaju"
        elif système in ["rumajaju", "glottolog"]:
            return système
        raise ValueError(système)

    def _valid_langue(ri, langue):
        if langue not in ri.langues():
            langue = ri.langue(langue)
        return langue

    def code(ri, langue, système="nuchab'äl"):
        langue = ri._valid_langue(langue)
        système = ri._valid_système(système)
        return ri.info[langue][système]

    def numérations(ri, langue):
        try:
            return ri.info[langue]["ajilanïk"]
        except KeyError:
            return langue

    def vérifier(ri):
        assert all(s in d for d in ri.info.values() for s in ["nuchab'äl", "rumajaju", "glottolog"])
        assert len(ri.langues()) == len(set(ri.langues()))
        for s in ["nuchab'äl", "rumajaju", "glottolog"]:
            assert len(ri.codes(s)) == len(set(ri.codes(s)))
