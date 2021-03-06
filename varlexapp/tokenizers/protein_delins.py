#\\b{}\\d+(_{}\\d+)?((DEL|del)|(INS|ins)|>)+{}*\\b
#protein digits (protein digits)? (del|ins|>) protein
#why "one or more" on the del/ins/>
import re

from typing import Pattern, Optional

from .tokenizer import Tokenizer
from .caches import AminoAcidCache
from ..models import Token

class ProteinFrameshift(Tokenizer):
    def __init__(self, amino_acid_cache: AminoAcidCache) -> None:
        self.__amino_acid_cache = amino_acid_cache
        self.__splitter: Pattern[str] = re.compile(r'\d+fs(\*\d+)?')

    def match(self, input_string: str) -> Optional[Token]:
        potential_protein = self.__splitter.split(input_string)
        conditions = (
                len(potential_protein) == 2,
                potential_protein[0] in self.__amino_acid_cache,
                not potential_protein[1]
        )

        if all(conditions):
            return Token(input_string, 'ProteinDelins', input_string)
        else:
            return None

