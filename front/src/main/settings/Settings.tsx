import React from "react";
import {Route} from "react-router-dom";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import SettingsChoice from "./SettingsChoice";

function Settings() {
    return (
        <div className="Settings">
            <div className="settings-choice">
                <SettingsChoice to="/settings/name">
                    <button className="btn btn-secondary">Name</button>
                    <button className="btn btn-outline-secondary">Name</button>
                </SettingsChoice>
                <SettingsChoice to="/settings/email">
                    <button className="btn btn-secondary">Email</button>
                    <button className="btn btn-outline-secondary">Email</button>
                </SettingsChoice>
            </div>
            <div className="settings-form">
                <Route path="/settings/name" component={EditName}/>
                <Route path="/settings/email" component={EditEmail}/>
            </div>
        </div>
    )
}

export default Settings;