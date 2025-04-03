from nuchabäl import Wuj 

def tjt_konojel_chabäl():
    wuj = Wuj()
    relesaxïk = wuj.konojelChabäl()
    assert isinstance(relesaxïk, list)
    assert len(relesaxïk) > 0
    assert all(isinstance(ch, str) for ch in relesaxïk)
