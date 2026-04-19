$URL = function() {
    var data = function(zipData) {
        var re = zipData.replace(/#(\d+)$/g, function(a, b) {
            return Array(+b + 3).join('#');
        }).replace(/#/g, '####').replace(/(\w\w):([\w#]+)(?:,|$)/g, function(a, hd, dt) {
            return dt.replace(/../g, function(a) {
                if (a != '##') {
                    return hd + a;
                } else {
                    return a;
                }
            });
        });
        return re;
    }('4e:020405060f12171f20212326292e2f313335373c40414244464a5155575a5b6263646567686a6b6c6d6e6f727475767778797a7b7c7d7f808182838485878a#909697999c9d9ea3aaafb0b1b4b6b7b8b9bcbdbec8cccfd0d2dadbdce0e2e6e7e9edeeeff1f4f8f9fafcfe,4f:00020304050607080b0c12131415161c1d212328292c2d2e31333537393b3e3f40414244454748494a4b4c525456616266686a6b6d6e7172757778797a7d8081828586878a8c8e909293959698999a9c9e9fa1a2a4abadb0b1b2b3b4b6b7b8b9babbbcbdbec0c1c2c6c7c8c9cbcccdd2d3d4d5d6d9dbe0e2e4e5e7ebecf0f2f4f5f6f7f9fbfcfdff,50:000102030405060708090a#0b0e1011131516171b1d1e20222324272b2f303132333435363738393b3d3f404142444546494a4b4d5051525354565758595b5d5e5f6061626364666768696a6b6d6e6f70717273747578797a7c7d818283848687898a8b8c8e8f909192939495969798999a9b9c9d9e9fa0a1a2a4a6aaabadaeafb0b1b3b4b5b6b7b8b9bcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdced0d1d2d3d4d5d7d8d9dbdcdddedfe0e1e2e3e4e5e8e9eaebeff0f1f2f4f6f7f8f9fafcfdfeff,51:00010203040508#090a0c0d0e0f1011131415161718191a1b1c1d1e1f2022232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e42474a4c4e4f5052535758595b5d5e5f606163646667696a6f727a7e7f838486878a8b8e8f90919394981a9d9e9fa1a3a6a7a8a9aaadaeb4b8b9babebfc1c2c3c5c8cacdced0d2d3d4d5d6d7d8d9dadcdedfe2e3e5e6e7e8e9eaeceef1f2f4f7fe,52:0405090b0c0f101314151c1e1f2122232526272a2c2f313234353c3e4445464748494b4e4f5253555758#595a5b5d5f6062636466686b6c6d6e7071737475767778797a7b7c7e808384858687898a8b8c8d8e8f91929495969798999a9ca4a5a6a7aeafb0b4b5b6b7b8b9babbbcbdc0c1c2c4c5c6c8cacccdcecfd1d3d4d5d7d9dadbdcdddee0e1e2e3e5e6e7e8e9eaebecedeeeff1f2f3f4f5f6f7f8fbfcfd,53:0102030407090a0b0c0e11121314181b1c1e1f2224252728292b2c2d2f3031323334353637383c3d404244464b4c4d505458595b5d65686a6c6d7276797b7c7d7e80818387888a8e8f#90919293949697999b9c9ea0a1a4a7aaabacadafb0b1b2b3b4b5b7b8b9babcbdbec0c3c4c5c6c7cecfd0d2d3d5dadcdddee1e2e7f4fafeff,54:000205070b1418191a1c2224252a303336373a3d3f4142444547494c4d4e4f515a5d5e5f6061636567696a6b6c6d6e6f7074797a7e7f8183858788898a8d919397989c9e9fa0a1a2a5aeb0b2b5b6b7b9babcbec3c5cacbd6d8dbe0e1e2e3e4ebeceff0f1f4f5fe');
    var U2Ghash = {}, G2Uhash = {};
    !function(data) {
        var k = 0;
        data = data.match(/..../g);
        for (var i = 0x81; i <= 0xfe; i++) {
            for (var j = 0x40; j <= 0xFE; j++) {
                U2Ghash[data[k++]] = ('%' + i.toString(16) + '%' + j.toString(16)).toUpperCase();
            }
        }
        for (var key in U2Ghash) {
            G2Uhash[U2Ghash[key]] = key;
        }
    }(data);
    return {
        encode: function(str) {
            return str.replace(/./g, function(a) {
                var code = a.charCodeAt(0);
                if (code <= 0x007F && code >= 0x0000) {
                    return encodeURIComponent(a);
                } else {
                    var key = code.toString(16);
                    if (key.length != 4) key = ('000' + key).match(/....$/)[0];
                    return U2Ghash[key] || a;
                }
            });
        },
        decode: function(str) {
            return str.replace(/%[0-9A-F]{2}%[0-9A-F]{2}/g, function(a) {
                if (a in G2Uhash) {
                    return String.fromCharCode('0x' + G2Uhash[a]);
                } else {
                    return a;
                }
            }).replace(/%[\w]{2}/g, function(a) {
                return decodeURIComponent(a);
            });
        }
    };
}();

function codePrint(string) {
    $("#footerTextArea").val(string);
    $("#spanTime").html("\u811A\u672C\u6700\u751F\u6210\u65F6\u95F4: " + getTime(0));
}

function getTime(int) {
    if (int === 0) {
        return new Date().Format('yyyy-MM-dd hh:mm:ss');
    } else {
        return new Date().Format('yyyyMMdd');
    }
}

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

function encodeChinese(string, type) {
    var str = $URL.encode(string);
    var reg = new RegExp("%", "g");
    if (type == null || type == undefined) {
        return '"' + str.replace(reg, "\\") + '"';
    } else {
        return str.replace(reg, "\\");
    }
}

function encodeRosText(string) {
    return $URL.decode(string.replace(/\\/g, "%"));
}

function getMac() {
    var num = Math.floor(Math.random() * 255);
    var word = ((num).toString(16)).toUpperCase();
    if (word.length === 1) {
        return word += "0";
    }
    return word;
}

function randomWord(randomFlag, min, max) {
    var str = "", range = min, arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

function initTools() {
    $("#sys_addAdminBtn").click(function() {
        codePrint('/user add name=' + $("#sys_user").val() + ' password=' + $("#sys_pass").val() + ' group=' + $("#sys_group").val());
    });

    $("#sys_shutdownBtn").click(function() {
        var action = $("#sys_shutdown").is(":checked") ? "/system shutdown" : "/system reboot";
        codePrint('/system schedule add start-time=' + $("#sys_time").val() + ' name=auto-' + (action == "/system shutdown" ? "shutdown" : "reboot") + ' on-event="' + action + '" policy=reboot,read,write,policy,test,password,sniff,sensitive start-date=jan/01/1970');
    });

    $("#sys_timezoneBtn").click(function() {
        codePrint('/system clock set time-zone=' + $("#sys_timezone").val());
    });

    $("#sys_consoleBtn").click(function() {
        codePrint('/system console set console=' + $("#sys_console").val());
    });

    $("#ins_pppoeBtn").click(function() {
        var code = '';
        var num = parseInt($("#ins_pppoe_num").val());
        var prefix = $("#ins_pppoe_iface").val();
        var lan = $("#ins_pppoe_lan").val();
        for (var i = 1; i <= num; i++) {
            code += '/ip firewall mangle add chain=prerouting new-connection-mark=p' + i + ' per-connection-classifier=both-addresses:' + num + '/' + (i - 1) + ' src-address=' + lan + '\n';
            code += '/ip firewall mangle add chain=prerouting connection-mark=p' + i + ' action=mark-routing new-routing-mark=r' + i + ' passthrough=no src-address=' + lan + '\n';
            code += '/ip route add gateway=' + prefix + i + ' routing-mark=r' + i + '\n';
        }
        code += '/ip firewall nat add chain=srcnat action=masquerade src-address=' + lan;
        codePrint(code);
    });

    $("#ins_dlBtn").click(function() {
        var code = '/ip route add dst-address=0.0.0.0/0 gateway=' + $("#ins_dl_ct").val() + ' distance=1 check-gateway=ping\n';
        code += '/ip route add dst-address=0.0.0.0/0 gateway=' + $("#ins_dl_unc").val() + ' distance=2 check-gateway=ping\n';
        code += '/ip firewall mangle add chain=prerouting src-address=' + $("#ins_dl_lan").val() + ' action=mark-routing new-routing-mark=to_ct routing-table=main\n';
        code += '/ip route add routing-mark=to_ct gateway=' + $("#ins_dl_ct").val();
        codePrint(code);
    });

    $("#ins_vlanBtn").click(function() {
        var code = '';
        var base = $("#ins_vlan_base").val();
        var id = $("#ins_vlan_id").val();
        var num = parseInt($("#ins_vlan_num").val());
        for (var i = 1; i <= num; i++) {
            code += '/interface vlan add interface=' + base + ' vlan-id=' + (parseInt(id) + i - 1) + ' name=vlan' + (parseInt(id) + i - 1) + '\n';
            code += '/interface pppoe-client add interface=vlan' + (parseInt(id) + i - 1) + ' name=' + $("#ins_pppoe_iface").val() + i + ' add-default-route=yes dial-on-demand=no use-peer-dns=yes password=abc123 user=abc123\n';
        }
        codePrint(code);
    });

    $("#ins_vrrpBtn").click(function() {
        var code = '/interface vrrp add interface=' + $("#ins_vrrp_master").val() + ' vrrp-id=1 priority=100 virtual-router-id=1\n';
        code += '/interface vrrp add interface=' + $("#ins_vrrp_backup").val() + ' vrrp-id=1 priority=90 virtual-router-id=1\n';
        code += '/ip address add address=' + $("#ins_vrrp_vip").val() + '/24 interface=bridge-local\n';
        codePrint(code);
    });

    $("#ins_wifiBtn").click(function() {
        codePrint('/interface wireless set [find name] ssid=' + encodeChinese($("#ins_wifi_ssid").val()) + ' mode=' + $("#ins_wifi_mode").val() + ' frequency=' + $("#ins_wifi_freq").val() + ' band=2ghz-g');
    });

    $("#ppp_pppoeBtn").click(function() {
        var code = '/interface pppoe-server server add service-name=pppoe interface=' + $("#ppp_pppoe_iface").val() + ' default-profile=' + $("#ppp_pppoe_profile").val() + '\n';
        code += '/ip pool add name=pppoe ranges=192.168.100.10-192.168.100.250\n';
        code += '/ip ppp profile add local-address=192.168.100.1 remote-address=pppoe dns-server=' + $("#ppp_pppoe_dns").val();
        codePrint(code);
    });

    $("#ppp_pptpBtn").click(function() {
        var type = $("#ppp_pptp_type").val();
        var code = '/interface ' + type + '-server server add interface=bridge-local default-profile=' + $("#ppp_pptp_profile").val() + '\n';
        code += '/ip pool add name=' + type + ' ranges=192.168.200.10-192.168.200.250\n';
        code += '/ip ' + type + ' profile add local-address=192.168.200.1 remote-address=' + type;
        codePrint(code);
    });

    $("#ppp_accountBtn").click(function() {
        codePrint('/ppp secret add name="' + $("#ppp_user").val() + '" password="' + $("#ppp_pass").val() + '" service=' + $("#ppp_service").val());
    });

    $("#ppp_batchBtn").click(function() {
        var code = '';
        var num = parseInt($("#ppp_num").val());
        for (var i = 0; i < num; i++) {
            code += '/ppp secret add name="ROS' + randomWord(false, 6) + '" password="' + randomWord(false, 8) + '" service=' + $("#ppp_service").val() + '\n';
        }
        codePrint(code);
    });

    $("#rl_queuesBtn").click(function() {
        var code = '/queue simple add name=download target=' + $("#rl_target").val() + ' max-limit=' + $("#rl_down").val() + '/' + $("#rl_up").val();
        codePrint(code);
    });

    $("#rl_pcqBtn").click(function() {
        var num = parseInt($("#rl_pcq_num").val());
        var code = '/queue type add name=PCQ-up kind=pcq pcq-rate=' + $("#rl_pcq_up").val() + ' pcq-limit=50 pcq-classifier=src-address pcq-total-limit=' + (50 * num) + '\n';
        code += '/queue type add name=PCQ-down kind=pcq pcq-rate=' + $("#rl_pcq_down").val() + ' pcq-limit=50 pcq-classifier=dst-address pcq-total-limit=' + (50 * num) + '\n\n';
        code += '/ip firewall mangle add chain=prerouting action=mark-packet new-packet-mark=all-mark\n\n';
        code += '/queue tree add name=PCQup parent=' + $("#rl_pcq_wan").val() + ' queue=PCQ-up packet-mark=all-mark\n';
        code += '/queue tree add name=PCQdown parent=' + $("#rl_pcq_lan").val() + ' queue=PCQ-down packet-mark=all-mark';
        codePrint(code);
    });

    $("#rl_pcqgBtn").click(function() {
        var code = '/queue type add name=upload kind=pcq pcq-rate=' + $("#rl_pcqg_up").val() + ' pcq-classifier=src-address\n';
        code += '/queue type add name=download kind=pcq pcq-rate=' + $("#rl_pcqg_down").val() + ' pcq-classifier=dst-address';
        codePrint(code);
    });

    $("#rl_htbBtn").click(function() {
        var code = '/queue type add name=pcq-upload kind=pcq pcq-rate=' + $("#rl_htb_up").val() + ' pcq-classifier=src-address\n';
        code += '/queue type add name=pcq-download kind=pcq pcq-rate=' + $("#rl_htb_down").val() + ' pcq-classifier=dst-address\n\n';
        code += '/queue tree add name=upload parent=global queue=pcq-upload\n';
        code += '/queue tree add name=download parent=global queue=pcq-download\n\n';
        code += '/ip firewall mangle add chain=prerouting tcp-flags=syn action=mark-packet new-packet-mark=syn-packet\n';
        code += '/queue tree add name=syn parent=global packet-mark=syn-packet priority=1 queue=default';
        codePrint(code);
    });

    $("#fw_pingBtn").click(function() {
        codePrint('/ip firewall filter add chain=input protocol=' + $("#fw_ping_proto").val() + ' action=drop comment="drop ping"');
    });

    $("#fw_urlBtn").click(function() {
        codePrint('/ip firewall nat add chain=dstnat action=redirect to-ports=8080 protocol=tcp dst-port=80');
    });

    $("#fw_arpBtn").click(function() {
        codePrint('/ip arp add address=' + $("#fw_arp_ip").val() + ' mac-address=' + $("#fw_arp_mac").val() + ' interface=' + $("#ins_dl_iface").val());
    });

    $("#fw_arp_dynamicBtn").click(function() {
        codePrint(':foreach rosjb in=[/ip arp find dynamic=yes] do={/ip arp add copy-from=$rosjb}');
    });

    $("#fw_arp_scheduleBtn").click(function() {
        codePrint('/system scheduler add interval=' + $("#fw_arp_interval").val() + ' name=' + encodeChinese("ARP\u5B9A\u65F6\u7ED1\u5B9A") + ' on-event=":foreach arp in=[/ip arp find dynamic=yes interface=' + $("#fw_arp_iface").val() + '] do={/ip arp add copy-from=$arp}" policy=reboot,read,write,policy,test,password,sniff,sensitive start-date=jan/01/1970 start-time=00:00:00');
    });

    $("#fw_tcpBtn").click(function() {
        codePrint('/ip firewall filter add chain=forward protocol=' + $("#fw_tcp_proto").val() + ' connection-limit=' + $("#fw_tcp_limit").val() + ',32 action=drop');
    });

    $("#fw_portBtn").click(function() {
        codePrint('/ip firewall nat add chain=dstnat dst-port=' + $("#fw_port_wport").val() + ' action=dst-nat to-addresses=' + $("#fw_port_lan").val() + ' to-ports=' + $("#fw_port_lport").val() + ' in-interface=' + $("#fw_port_wan").val());
    });

    $("#fw_blockBtn").click(function() {
        var ports = $("#fw_block_port").val().split(',');
        var code = '';
        for (var i = 0; i < ports.length; i++) {
            code += '/ip firewall filter add chain=forward protocol=tcp dst-port=' + ports[i].trim() + ' action=' + $("#fw_block_action").val() + '\n';
        }
        codePrint(code);
    });

    $("#fw_httpBtn").click(function() {
        codePrint('/ip firewall filter add chain=forward protocol=tcp dst-port=80 content=' + $("#fw_http_key").val() + ' action=drop');
    });

    $("#sc_onlineBtn").click(function() {
        var code = '/ip firewall address-list add address=' + $("#sc_online_ip").val() + ' list=lan\n';
        code += '/ip firewall mangle add chain=prerouting src-address-list=lan action=add-src-to-address-list address-list="Online" address-list-timeout=1m\n';
        code += '/system schedule add interval=' + $("#sc_online_interval").val() + ' name=' + encodeChinese("\u7EDF\u8BA1\u5728\u7EBF\u8BA1\u6570") + ' on-event=":local s 0\r\n:foreach i in=[/ip firewall address-list find list=Online] do={:set s ($s+1)}\r\nlog warning (\u5F53\u524D\u6709.$s.\u4F4D\u7528\u6237\u5728\u7EBF)" policy=reboot,read,write,policy,test,password,sniff,sensitive start-date=jan/01/1970 start-time=00:00:00';
        codePrint(code);
    });

    $("#sc_online_5xBtn,#sc_online_6xBtn").click(function() {
        var is6x = this.id === "sc_online_6xBtn";
        var code = '';
        if ($("#sc_online_week").is(':checked')) {
            code += ':local Date [/system clock get date];\n';
            code += ':local Year ([:pick $Date 7 11]-1);\n';
            code += ':local Month ([:find jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec [:pick $Date 0 3]]);\n';
            code += ':local Day [:pick $Date 4 6];\n';
            code += ':if ([:pick $Date 4 5] = 0) do={:set Day [:pick $Date 5 6]};\n';
            code += ':set Day ($Day-1);\n';
            code += ':local leapyear 0,31,59,90,120,151,181,212,243,273,304,334,0,31,60,91,121,152,182,213,244,274,305,335\n';
            code += ':local Today ($Year*365+$Year/4):if (($Year-$Year/4*4) != 3) do={:set Today ($Today+[:pick $leapyear $Month]+$Day)} else={:set Today ($Today+[:pick $leapyear ($Month+12)]+$Day)}\n';
            code += ':local day ($Today-$Today/7*7)\n';
            code += ':if ($day=0) do={:set day "\u65E5"} else={:if ($day=1) do={:set day "\u4E00"} else={:if ($day=2) do={:set day "\u4E8C"} else={:if ($day=3) do={:set day "\u4E09"} else={:if ($day=4) do={:set day "\u56DB"} else={:if ($day=5) do={:set day "\u4E94"} else={:if ($day=6) do={:set day "\u516D"}}}}}}}\n';
        }
        if ($("#sc_online_time").is(':checked')) {
            code += ':local time [/system clock get time]\n';
        }
        if ($("#sc_online_cpu").is(':checked')) {
            code += ':local cpu [/system resource get cpu-load]\n';
        }
        if ($("#sc_online_mem").is(':checked')) {
            code += ':local ram [/system resource get free-memory]\n';
        }
        if ($("#sc_online_pppoe").is(':checked')) {
            code += ':local userpppoe [:len [/ppp active find service=("pppoe")]]\n';
        }
        if ($("#sc_online_online").is(':checked')) {
            code += ':local numOnline [:len [/ip firewall address-list find list=("Online")]]\n';
        }

        code += ':log warning "====================================="\n';

        if ($("#sc_online_week").is(':checked')) {
            code += ':log error ("\u662F\u661F\u671F" . $day)\n';
        }
        if ($("#sc_online_time").is(':checked')) {
            code += ':log warning ("\u5F53\u524D\u5317\u4EAC\u65F6\u95F4:".$time")\n';
        }
        if ($("#sc_online_cpu").is(':checked')) {
            code += ':log warning ("\u5F53\u524DCPU\u4F7F\u7528\u7387:".$cpu."%")\n';
        }
        if ($("#sc_online_mem").is(':checked')) {
            var memery = is6x ? "1048576" : "1024";
            code += ':log warning ("\u5185\u5B58\u5269\u4F59:".$ram"/"+memery+".MB\u53EF\u7528")\n';
        }
        if ($("#sc_online_pppoe").is(':checked')) {
            code += ':log warning ("\u6709pppoe\u5728\u7EBF\u7528\u6237:".$userpppoe."\u4E2A")\n';
        }
        if ($("#sc_online_online").is(':checked')) {
            code += ':log error ("\u6709:".$numOnline."\u4E2A\u7528\u6237\u5728\u7EBF")\n';
        }
        code += ':log warning "====================================="';
        codePrint(code);
    });

    $("#sc_backupBtn").click(function() {
        var code = '/system backup save name=' + $("#sc_backup_name").val() + '\n';
        code += '/system scheduler add interval=' + $("#sc_backup_interval").val() + ' name=backup-on-boot on-event="/system backup save name=backup" policy=reboot,read,write,policy,test,password,sniff,sensitive start-date=jan/01/1970 start-time=00:00:00';
        codePrint(code);
    });

    $("#sc_pccBtn").click(function() {
        var code = ':foreach i in=[/interface pppoe-server find running=yes] do={/interface pppoe-server disable $i}\n';
        code += ':delay 3s\n';
        code += ':foreach i in=[/interface pppoe-server find] do={/interface pppoe-server enable $i}';
        codePrint(code);
    });

    $("#sc_beepBtn").click(function() {
        var type = $("#sc_beep_type").val();
        var thresh = $("#sc_beep_thresh").val();
        var code = '/tool traffic-monitor add name=' + type + 'Monitor ';
        if (type === "cpu") {
            code += 'trigger=above threshold=' + thresh + ' on-event=":beep frequency=1000 length=3ms"';
        } else if (type === "memory") {
            code += 'trigger=above threshold=' + thresh + ' on-event=":beep frequency=2000 length=3ms"';
        } else {
            code += 'trigger=above threshold=' + thresh + ' on-event=":beep frequency=3000 length=3ms"';
        }
        codePrint(code);
    });

    $("#mac_genBtn").click(function() {
        var code = '';
        var num = parseInt($("#mac_num").val());
        var symbol = $("input[name='mac_type']:checked").val() === ":" ? ":" : "-";

        var prefix = "";
        if ($("#mac_fixed").is(":checked")) {
            prefix = $("#mac_a").val() + symbol + $("#mac_b").val() + symbol + $("#mac_c").val() + symbol;
        }

        for (var i = 0; i < num; i++) {
            var mac = prefix;
            if (prefix === "") {
                for (var k = 0; k < 6; k++) {
                    mac += getMac();
                    if (k < 5) mac += symbol;
                }
            } else {
                for (var k = 3; k < 6; k++) {
                    mac += getMac();
                    if (k < 5) mac += symbol;
                }
            }
            code += mac + '\n';
        }
        codePrint(code);
    });

    $("#mac_setBtn").click(function() {
        codePrint('/interface ethernet set ' + $("#mac_name").val() + ' mac-address=' + $("#mac_new").val());
    });

    $("#tools_ssidBtn").click(function() {
        codePrint('/interface wireless set [find ssid="' + $("#tools_ssid_name").val() + '"]');
    });

    $("#tools_nwBtn").click(function() {
        var code = '/tool netwatch add host=' + $("#tools_nw_ip").val() + ' interval=' + $("#tools_nw_interval").val() + ' timeout=3s';
        codePrint(code);
    });

    $("#tools_mangleBtn").click(function() {
        var code = '/ip firewall mangle add chain=prerouting src-address=' + $("#tools_mangle_ip").val() + 'action=mark-packet new-packet-mark=' + $("#tools_mangle_up").val() + '\n';
        code += '/ip firewall mangle add chain=prerouting dst-address=' + $("#tools_mangle_ip").val() + ' action=mark-packet new-packet-mark=' + $("#tools_mangle_down").val();
        codePrint(code);
    });

    $("#route_ipBtn").click(function() {
        var ipsName = 'chinatelecom';
        if ($("#route_unc").is(":checked")) ipsName = 'unicom_cnc';
        else if ($("#route_cmcc").is(":checked")) ipsName = 'cmcc';
        else if ($("#route_cn").is(":checked")) ipsName = 'all_cn';

        $.ajax({
            url: './ip/' + ipsName + '.txt',
            async: false,
            success: function(data) {
                codePrint(data);
            }
        });
    });

    $("#route_genBtn").click(function() {
        var code = '/ip route add dst-address=0.0.0.0/0 gateway=' + $("#route_gateway").val() + ' scope=' + $("#route_scope").val();
        codePrint(code);
    });

    $("#ddnsBtn").click(function() {
        var domainName = $("#ddns_domain").val() + "." + $("#ddns_suffix").val();
        var string = '';

        if ($("#ddns_f3322").is(":checked")) {
            string = ':\do {\n:local ether\n:local user "' + $("#ddns_user").val() + '"\n:local pass "' + $("#ddns_pass").val() + '"\n:local host "' + domainName + '"\n:local status [/interface pppoe-client get [/interface pppoe-client find name=' + $("#ddns_wan1").val() + '] running];\n:if ($status=true) do={:set ether "' + $("#ddns_wan1").val() + '"};\n:if ($status=false) do={:set ether "' + $("#ddns_wan2").val() + '"};\n:local oldip [:resolve $host]\n:delay 5s\n:local newip [ /ip address get [/ip address find interface=$ether ] address ]\n:set newip [:pick $newip 0 [:find $newip "/"]]\n:if ($oldip != $newip) do={\n/tool fetch url=("http://members.3322.org/dyndns/update?system=dyndns&hostname=$host&myip=$newip") mode=http user=$user password=$pass dst-path=$host\n:log error ("\u539F\u6765IP\u5730\u5740": ".$oldip)\n:log error ("\u65B0\u6765IP\u5730\u5740": ".$newip)\ndelay 3s\n:local Result [/file get $host contents]\n:if ([:find $Result "good"] != "nil") do={\n:log error ($host." \u66F4\u65B0\u6210\u529F")\n} else={\n:log error ($host." \u66F4\u65B0\u5931\u8D25")}\n/file remove $host}}';
        } else if ($("#ddns_oray").is(":checked")) {
            string = ':local ipaddr\n:local server "http://ddns.oray.com"\n:local domain "' + domainName + '"\n:local par "/ph/update?&myip=$ipaddr"\n:local users "' + $("#ddns_user").val() + '"\n:local paswd "' + $("#ddns_pass").val() + '"\n:set ipaddr [/ip address get [/ip address find interface=' + $("#ddns_wan1").val() + ' address]\n:set ipaddr [:pick $ipaddr 0 ([len $ipaddr] -3)]\n/tool fetch url=($server.$par) mode=http user=$users password=$paswd';
        }
        codePrint(string);
    });

    $("#pccBtn").click(function() {
        var code = ':global interface "' + $("#pcc_iface").val() + '"\n';
        code += ':global lanip "' + $("#pcc_lan").val() + '"\n';
        code += ':global num "' + $("#pcc_num").val() + '"\n';
        code += ':for i from=1 to=$num do={/ip firewall mangle add action=mark-connection chain=prerouting comment=("pcc-". $i) connection-state=new new-connection-mark=($i) per-connection-classifier=("both-addresses:" . ($num . "/" . ($i - 1))) src-address=($lanip)\n';
        code += '/ip firewall mangle add action=mark-routing chain=prerouting comment=("route-" . $i) connection-mark=($i) new-routing-mark=($i) passthrough=no src-address=($lanip)\n';
        code += '/ip route add comment=($i) dst-address=0.0.0.0/0 gateway=($interface . $i) routing-mark=($i) scope=30 target-scope=10}\n';
        code += '/ip firewall nat add action=masquerade chain=srcnat comment="default" src-address=($lanip)';
        codePrint(code);
    });

    $("#clearBtn").click(function() {
        $("#footerTextArea").val("");
    });

    $("#copyBtn").click(function() {
        if ($("#footerTextArea").val() !== "") {
            document.querySelector("#footerTextArea").select();
            document.execCommand('copy');
        }
    });

    $("#replaceBtn").click(function() {
        $("#footerTextArea").val($("#footerTextArea").val().replace(new RegExp($("#beforeText").val(), 'g'), $("#afterText").val()));
    });

    $("#transCHNBtn").click(function() {
        $("#inputText").val(encodeRosText($("#inputText").val()));
    });

    $("#transROSBtn").click(function() {
        $("#inputText").val(encodeChinese($("#inputText").val(), 1));
    });
}