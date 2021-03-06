import React, { Component } from "react";
import { Table, Input, InputOnChangeData, Divider } from "semantic-ui-react";
import { TokenResponse, Token } from "../types/VarlexTypes";
import { getTokens } from "../services/VarlexApi"

type State = {
    tokenResponse: TokenResponse | null;
    activeTimeout: number | null;
};

export class TokenTable extends Component<{}, State> {

    state: State = {
        tokenResponse: null,
        activeTimeout: null
    }

    render() {
        return (
            <div>
                <Divider />
                <h3>Tokenization Testing</h3>
                <Input icon='search' placeholder='Tokenize' onChange={this.onSearchChanged} />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Term</Table.HeaderCell>
                            <Table.HeaderCell>Token Type</Table.HeaderCell>
                            <Table.HeaderCell>Match Type</Table.HeaderCell>
                            <Table.HeaderCell>Input String</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.tableContents()}
                </Table>
            </div>
        );
    }

    private onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        if (this.state.activeTimeout) {
            window.clearTimeout(this.state.activeTimeout);
        }

        let searchTerm = event.target.value;
        let newTimer = window.setTimeout(() => { this.tokenize(searchTerm) }, 500);

        this.setState((prevState) => {
            return {
                ...prevState,
                activeTimeout: newTimer
            }
        });
    }

    private tokenize = (searchTerm?: string) => {
        getTokens(searchTerm || '')
            .then(tokenResponse => this.setState({ tokenResponse: tokenResponse }));
    }

    private tableContents = (): JSX.Element => {
        if (this.state.tokenResponse && this.state.tokenResponse.tokens.length > 0) {
            const rows = this.state.tokenResponse.tokens.map((token: Token, index: number) =>
                <Table.Row key={index}>
                    <Table.Cell>{token.token}</Table.Cell>
                    <Table.Cell>{token.tokenType}</Table.Cell>
                    <Table.Cell>{token.matchType}</Table.Cell>
                    <Table.Cell>{token.inputString}</Table.Cell>
                </Table.Row>
            );
            return <Table.Body>{rows}</Table.Body>
        } else {
            return <Table.Body><Table.Row><Table.Cell>No Matches...</Table.Cell></Table.Row></Table.Body>;
        }
    }
}
