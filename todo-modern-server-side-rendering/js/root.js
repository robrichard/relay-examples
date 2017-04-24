'use strict';

export default graphql`
    query rootQuery ($status: String) {
        viewer {
            ...TodoApp_viewer
        }
    }
`;
