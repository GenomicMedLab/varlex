import re

from .tokenizer import Tokenizer
from .token import Token

class ProteinTermination(Tokenizer):
    def __init__(self, amino_acid_cache):
        self.__amino_acid_cache = amino_acid_cache
        self.__splitter = re.compile(r'\d+')

    def match(self, input_string):
        potential_protein = self.__splitter.split(input_string)
        if (len(potential_protein) == 2 and
                potential_protein[0] in self.__amino_acid_cache and
                potential_protein[1].upper() == 'X'):
            return Token(input_string, 'ProteinTermination')
        else:
            return None
