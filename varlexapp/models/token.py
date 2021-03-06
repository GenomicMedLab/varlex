from .token_match_type import TokenMatchType

class Token:
    def __init__(self, token: str, token_type: str, input_string: str, match_type: TokenMatchType = TokenMatchType.UNSPECIFIED) -> None:
        self.token = token
        self.token_type = token_type
        self.match_type = match_type
        self.input_string = input_string
        self.object_type = self.__class__.__name__
