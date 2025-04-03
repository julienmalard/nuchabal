from nuchabäl import Nuchabäl 

def tjt_konojel_chabäl():
    nchbl = Nuchabäl()
    relesaxïk = nchbl.konojelChabäl()
    assert isinstance(relesaxïk, list)
    assert len(relesaxïk) > 0
    assert all(isinstance(ch, str) for ch in relesaxïk)
