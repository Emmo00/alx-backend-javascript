from typing import List, Union


RealNumber = Union[int, float]
def sum_mixed_list(mxd_lst: List[RealNumber]) -> float:
    sum = 0
    for n in mxd_lst:
        sum += n
    return sum
