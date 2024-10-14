import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-cloud/Modeler';
import ElementTemplatesIconsRenderer from '@bpmn-io/element-template-icon-renderer';
import { ElementTemplatesService } from '../services/elementtemplates.service';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';
import { CloudElementTemplatesPropertiesProviderModule } from 'bpmn-js-element-templates';

@Component({
  selector: 'app-modeler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modeler.component.html',
  styleUrl: './modeler.component.css'
})
export class ModelerComponent {

  elementTemplatesService = inject(ElementTemplatesService);

  @ViewChild('modeler') modelerElt: ElementRef | undefined;
  @ViewChild('properties') properties: ElementRef | undefined;
  
  view = 'modeler';
  modeler: BpmnModeler | undefined;
  elementTemplates: any[] = this.elementTemplatesService.elementTemplates();
  processDef = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Web Modeler" exporterVersion="3baa5d2" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.6.0">
  <bpmn:process id="Process_028ntyu" name="New BPMN Diagram" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_028ntyu">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="150" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;



  ngAfterViewInit(): void {

    this.modeler = new BpmnModeler({
      container: this.modelerElt!.nativeElement,
      propertiesPanel: {
        parent: this.properties!.nativeElement
      },
      height: '100vh',
      position: 'center',
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule,
    CloudElementTemplatesPropertiesProviderModule
  ],
  elementTemplates: this.elementTemplates
    });
    this.modeler!.importXML(this.processDef);
 
  }

  switchView(): void {
    if (this.view=='modeler') {
	  this.modeler!.saveXML().then((result: any) => {
	    this.view='xml';
		this.processDef = '<?xml version="1.0" encoding="UTF-8"?>\n'+this.prettifyXml(result.xml);
	  });
	} else {
	  this.view='modeler';
	}
  }
  
  prettifyXml(sourceXml: string): string {
    
    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString([
      `<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" indent="yes" />
<xsl:template match="/">
<xsl:copy-of select="/" />
</xsl:template>
</xsl:transform>`,
    ].join('\n'), 'application/xml');

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);
    return resultXml;
  };
}
